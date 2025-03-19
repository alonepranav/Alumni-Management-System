const GetImageId = (n = 10) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let id = "";
    for (let i = 0; i < n; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
};


export default GetImageId;