/**
 * generic-model.tsx
 * @Date 2024-09-30
 * @commit feat: Add connection with backend for import files
 * @description: Correction for allow send files to backend 
 * @author jhoncolocolo
 * @version 1.0
 */

class GenericModel<T> {
    private baseURL: string;
    private resourcePath: string;

    constructor(resourcePath: string) {
      this.baseURL = process.env.REACT_APP_API_BASE_URL || '';
      this.resourcePath = resourcePath;
    }
  
    private async request(path: string, method: string, params?: any, isFileUpload: boolean = false): Promise<T> {
        
      const url = new URL(`${this.baseURL}/${this.resourcePath}/${path}`);
        const headers = new Headers();
    
        // Obtener token de la cookie o de cualquier otra forma que estés manejando
        const token = localStorage.getItem('token');
    
        if (token) {
          headers.append("Authorization", `Bearer ${token}`);
        }
    
        const requestOptions: RequestInit = {
          method: method,
          headers: isFileUpload ? headers : headers, // No añadir headers si es un archivo
          credentials: "include", // Incluye cookies en la solicitud
        };
    
        if (params) {
          if (method === "GET") {
            url.search = new URLSearchParams(params).toString() as any; // Usa 'as any' para el casting
          } else {
            if (!isFileUpload) {
              headers.append("Content-Type", "application/json");
              requestOptions.body = JSON.stringify(params);
            } else {
              requestOptions.body = params; // Si es un archivo, params será el FormData
            }
          }
        }
    
        const response = await fetch(url.toString(), requestOptions);
    
        if (!response.ok) {
          if (response.status === 401) { // Check for specific 401 status code
            console.log(`Error ${response.status}: ${response.statusText}`);
            window.location.href = "/unauthorized"; // Redirigir a una ruta no autorizada si es 401
          } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
        }
    
        return response.json();
      }

      async uploadFile(formData: FormData): Promise<T> {
        return this.request("", "POST", formData, true);
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