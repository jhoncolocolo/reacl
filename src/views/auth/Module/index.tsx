import React from "react";
import { Module } from "../../../models/masters/module";
import GenericModel from "../../../http/generic-model";

const Modules :React.FC = () =>{
    const api = React.useMemo(() => new GenericModel<Module>('api/modules'), []); // in order to avoid that change the reference if reload the page    
    const [modules,setModules] = React.useState<Module[]>([]);
    const [loading,setLoading] = React.useState<Boolean>(false);
    const [hasFetched,setHasFetched] = React.useState<Boolean>(false);

    const getData = React.useCallback(()=>{
      setLoading(true); 
      api.getAll().then(data =>{
        setModules(data);
        setLoading(false);
      }) 
    },[api]);
    
    React.useEffect(()=>{
        if(!hasFetched){
            getData();
            setHasFetched(true);
        }
    },[hasFetched,getData]);
    
    if(loading){
        return  <div>Loading...</div>
    }else{
        return  (
            <div className="table-list-5-columns">
                <div className="col-12">
                    <div>
                    <table className="resp">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Path</th>
                            <th>Description</th>
                            <th>
                                <button onClick={() => alert("We are going to create a new Registry")}
                                            className="navbar-brand" type="button" >  Create </button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {modules.map((module: Module, index: number) => (
                            <tr key={index}>
                                <td>{module.name}</td>
                                <td>{module.image}</td>
                                <td>{module.description}</td>
                                <td>
                                    <div className="btn-actions">
                                        <div className="btn edit-action">
                                            <button onClick={() => alert("We are going to Edit the registry with number "+module.id)}
                                            className="navbar-brand" type="button" >  &#9997;  </button>
                                        </div>
                                        <div className="btn delete-action">
                                            <button  onClick={() =>  alert("We are going to Delete the registry with number "+module.id)}
                                            className="navbar-brand" type="button"> &#9940; </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
    
            </div>
            
    );
    }
}

export {Modules};