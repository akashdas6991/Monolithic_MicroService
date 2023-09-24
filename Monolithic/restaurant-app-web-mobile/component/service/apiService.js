
const RESTURANT_APP_URL = "http://192.168.29.189:8080";

class ApiService
{
    signUp(requestBody) 
    { 
        try
        {    
            const responseBody = fetch(RESTURANT_APP_URL+'/auth/user/signUp' , {
                                        method: "POST", 
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(requestBody),
            });

            return responseBody; 
        }
        catch(error)
        {
            return error;
        }
    }

    signIn(requestBody)
    {           
        try
        {
            const responseBody = fetch(RESTURANT_APP_URL+'/auth/user/signIn' , {
                                        method: "POST", 
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(requestBody),
            });
            
            return responseBody ;
        }
        catch(error)
        {
            return error;
        }
    }

    signOut(requestBody,token)
    {           
        try
        {
            const responseBody = fetch(RESTURANT_APP_URL+'/auth/user/signOut' , {
                                        method: "POST", 
                                        headers: {
                                            "Content-Type"  : "application/json",
                                            "Authorization" : "Bearer "+token
                                        },
                                        body: JSON.stringify(requestBody),
            });
            
            return responseBody ;
        }
        catch(error)
        {
            return error;
        }
    }
}

export default new ApiService();