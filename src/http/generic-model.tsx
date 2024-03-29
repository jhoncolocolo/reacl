class GenericModel<T> {
    private baseURL: string;
  
    constructor(baseURL: string) {
      this.baseURL = baseURL;
    }
  
    private async request(path: string, method: string, params?: any): Promise<T> {
        const url = new URL(`${this.baseURL}/${path}`);
        const headers = new Headers();
    
        // Obtener token de la cookie o de cualquier otra forma que estés manejando
        const token = localStorage.getItem('token');
    
        if (token) {
          headers.append("Authorization", `Bearer ${token}`);
        }
    
        const requestOptions: RequestInit = {
          method: method,
          headers: headers,
          credentials: "include", // Incluye cookies en la solicitud
        };
    
        if (params) {
          if (method === "GET") {
            url.search = new URLSearchParams(params).toString() as any; // Usa 'as any' para el casting
          } else {
            headers.append("Content-Type", "application/json");
            requestOptions.body = JSON.stringify(params);
          }
        }
    
        const response = await fetch(url.toString(), requestOptions);
    
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    
        return response.json();
      }
  
    async getAll(): Promise<T[]> {
      return this.request("", "GET") as Promise<T[]>;
    }
  
    async query(params: any): Promise<T[]> {
      return this.request("", "GET", params) as Promise<T[]>;
    }
  
    async find(id: string): Promise<T> {
      return this.request(id, "GET") as Promise<T>;
    }
  
    async save(data: T): Promise<T> {
      return this.request("", "POST", data) as Promise<T>;
    }
  
    async update(id: string, data: T): Promise<T> {
      return this.request(id, "PUT", data) as Promise<T>;
    }
  
    async remove(id: string): Promise<void> {
      await this.request(id, "DELETE");
    }
  }
  
  export default GenericModel;