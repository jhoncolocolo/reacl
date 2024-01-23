import React from "react";

const Form : React.FC = () =>{

    const [name,setName] = React.useState<string>();
    const [role,setRole] = React.useState<string>();
    const [description,setDescription] = React.useState<string>();


    const onSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault();
        console.log(name);
    }
    return (
        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="col-12 mb-2">
                    <div className="form-group">
                        <label>Name</label>
                        <input value={name} onChange={e =>setName(e.target.value)}  className="form-control"/>
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="form-group">
                        <label>Role</label>
                        <input value={role} onChange={e =>setRole(e.target.value)}  className="form-control"/>
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="form-floating">
                        <textarea className="form-control" id="floatingTextarea2"
                        value={description} onChange={e =>setDescription(e.target.value)}
                        style={{ height: "100px" }}
                        ></textarea>
                        <label htmlFor="floatingTextarea2">Description</label>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </div>                        
       </form>
    );
}

export {Form};