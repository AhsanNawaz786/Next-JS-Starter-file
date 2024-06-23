export default function UserProfile({params}: any){
    // folder named [id] and params.id gets d typed data in url 
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white bg-black">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl font-semibold">Profile page 
            <span className="p-2 rounded bg-orange-300 text-black">{params.id}</span></p>
            
        </div>
        
    )
}