async function authorizeAdmins(){
    try {
        const token = await getAccessTokenSilently();
        const response = await fetch('/AdminDashboard',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const responseData = await response.json();
        //if response indicates admin, set admin value to state
        if(responseData.adminMsg === 'admin'){
            setAdminAccess('admin')
        }
        else{
            return
        }

    } catch (err) {
        console.log(err)
    }