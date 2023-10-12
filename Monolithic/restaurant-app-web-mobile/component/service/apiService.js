
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


    firstMenuItems()
    {
        const items = [
            {   id : 1 ,  name : "Biryani",        img : "https://b.zmtcdn.com/data/dish_images/d19a31d42d5913ff129cafd7cec772f81639737697.png"    },
            {   id : 2 ,  name : "Rolls",          img : "https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png"    },
            {   id : 3 ,  name : "Pizza",          img : "https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png"      },
            {   id : 4 ,  name : "Burger",         img : "https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png"    },
            {   id : 5 ,  name : "Chicken",        img : "https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png"    },
            {   id : 6 ,  name : "Thali",          img : "https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png"      },
            {   id : 7 ,  name : "Fried Rice",     img : "https://b.zmtcdn.com/data/o2_assets/e444ade83eb22360b6ca79e6e777955f1632716661.png"      },
            {   id : 8 ,  name : "North Indian",   img : "https://b.zmtcdn.com/data/o2_assets/019409fe8f838312214d9211be010ef31678798444.jpeg"     },
            {   id : 9 ,  name : "Chowmein",       img : "https://b.zmtcdn.com/data/o2_assets/c21624eac87ed1c8c87ef1ea52980ded1632716659.png"      },
            {   id : 10 , name : "Momos",          img : "https://b.zmtcdn.com/data/o2_assets/5dbdb72a48cf3192830232f6853735301632716604.png"      },
            {   id : 11 , name : "Cake",           img : "https://b.zmtcdn.com/data/dish_images/d5ab931c8c239271de45e1c159af94311634805744.png"    },
            {   id : 12 , name : "Sandwich",       img : "https://b.zmtcdn.com/data/o2_assets/fc641efbb73b10484257f295ef0b9b981634401116.png"      },
            {   id : 13 , name : "Paneer",         img : "https://b.zmtcdn.com/data/dish_images/e44c42ff4b60b025225c8691ef9735b11635781903.png"    },
        ];
        return items;
    }

    secondMenuItems()
    {
        const items = [
            {   id : 1 ,  name : "KFC",             distance : "25 min",  img : "https://b.zmtcdn.com/data/brand_creatives/logos/560b209a689eefa9feb367b5d5604097_1611382952.png?output-format=webp"},
            {   id : 2 ,  name : "Chowman",         distance : "32 min",  img : "https://b.zmtcdn.com/data/brand_creatives/logos/6799a847a4bfaee73f5e14aaba8cef83_1638193272.png?output-format=webp"},
            {   id : 3 ,  name : "Burger King",     distance : "36 min",  img : "https://b.zmtcdn.com/data/brand_creatives/logos/6a11fd0f30c9fd9ceaff2f5b21f61d23_1617188103.png?output-format=webp"},
            {   id : 4 ,  name : "Shangai",         distance : "51 min",  img : "https://b.zmtcdn.com/data/brand_creatives/logos/c71b0bfcb5ee0f5773e38722eab308bf_1647263570.png?output-format=webp"},
            {   id : 5 ,  name : "Gupta Brothers",  distance : "21 min",  img : "https://b.zmtcdn.com/data/brand_creatives/logos/a2531dc570196c0cd9322814eb010d94_1605102324.png?output-format=webp"},
            {   id : 6 ,  name : "WOW! China",      distance : "37 min",  img : "https://b.zmtcdn.com/data/brand_creatives/logos/7bd8d15b440414feab366ee63b046f5d_1672388843.png?output-format=webp"},
            {   id : 7 ,  name : "Aami Bangali",    distance : "26 min",  img : "https://b.zmtcdn.com/data/brand_creatives/logos/de549338ab168af8f843e05ea9846859_1557132846.png?output-format=webp"},
        ];
        return items;
    }

    ///////////////////////////////////////

    wallets()
    {
        const items = [
            {   id : "wallet1" ,  name : "Paytm",       img : "Paytm Logo"},
            {   id : "wallet2" ,  name : "Amazon Pay",  img : "Amazon Pay Logo"},
            {   id : "wallet3" ,  name : "PhonePe",     img : "PhonePe Logo"},
        ];
        return items;
    }

    banks()
    {
        const items = [
            {   id : "bank1" ,  name : "Axis Bank",         img : "Axis bank logo"},
            {   id : "bank2" ,  name : "Bank Of Baroda",    img : "baroda bank logo"},
            {   id : "bank3" ,  name : "Canada Bank",       img : "Canada Bank logo"},
            {   id : "bank4" ,  name : "DBS Bank",          img : "Dbs bank logo"},
            {   id : "bank5" ,  name : "Eastern Bank",      img : "Eastern bank logo"},            
        ];
        return items;
    }


}

export default new ApiService();