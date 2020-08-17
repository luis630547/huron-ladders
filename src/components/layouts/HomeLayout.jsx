import React, {  useState } from "react";
import { Typography, TextField, Button, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab"

const HomeLayout = ({ setUser }) => {
    const [handle, setHandle] = useState("");
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const fetchUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("fetched");
        fetch(`https://codeforces.com/api/user.info?handles=${handle}`)
            .then(res => res.json())
            .then(data => {
                if(data.status === "FAILED"){
                    setError(true);
                    setIsLoading(false);
                    return;
                }
                setError(false);
                setUser(data.result[0]);
                setIsLoading(false);
                setOpen(true);
            })
    }

    return (
        <div className="homeLayout">
        
            <Snackbar style={{marginTop: "4rem"}} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                <Alert severity="success" variant="filled">
                    Success! Welcome {handle}!
                </Alert>
            </Snackbar>
            <Typography variant="h2" align="center">Huron Ladders</Typography>
            <Typography variant="subtitle1" align="center">Este es un proyecto open source creado para el Club de Algoritmia de ESCOM.</Typography>
            <form onSubmit={fetchUser} style={{ display: "flex", flexDirection:"column", alignItems: "center", margin: "2rem 0"}}>
                {error === false ? (
                    <TextField size="small" label="Codeforces handle" variant="outlined" value={handle} onChange={(e) => setHandle(e.target.value)} style={{marginBottom: "1rem"}} />
                ): (
                    <TextField error helperText={`The user not exist`} size="small" label="Codeforces handle" variant="outlined" value={handle} onChange={(e) => setHandle(e.target.value)} style={{marginBottom: "1rem"}} />
                )}
                <Button type="submit" disabled={isLoading} variant="contained" color="primary">Search</Button>
            </form>
        </div>
    )
}

export default HomeLayout;