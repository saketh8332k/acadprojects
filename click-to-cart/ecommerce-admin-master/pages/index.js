// import Layout from "@/components/Layout";
// import {useSession, signIn, signOut} from "next-auth/react";
// import Nav from "@/components/Nav";

// export default function Home() {
//   const {data: session} = useSession();
  
//   return<Layout>
//     <div className="bg-blue-900 w-screen h -screen flex justify-between">
//       <h2>
//         Hello, <b>{session?.user?.name}</b>
//       </h2>
//       <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
//         <img src={session?.user?.image} alt="" className="w-6 h-6"/>
//         <span className="px-2">
//           {session?.user?.name}
//         </span>
        
//           {/* <div className="text-center w-full"> */}
//            {/* <button onClick={() => signIn('google')}></button> */}
//             {/* <span className="px-2"> */}
//               {/* {session?.user?.name} */}
//             {/* </span> */}
//           {/* </div> */}
//       </div>
//     </div>
//   {/* </Layout> */}
  
//   </Layout>
  
  
// return(
//   <div className="bg-blue-900 min-h-screen flex">
//     {/* <Nav/> */}
//     <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">logged in {session.user.email}</div>
//   </div>
// ) 
// }

import Layout from "@/components/Layout";
import {useSession} from "next-auth/react";
// import admin from "./image.jpg";
export default function Home() {
  const {data: session} = useSession();
  return <Layout>
    <div className="bg-blue-900 w-screen h -screen flex justify-between">
      <h2 style={{WebkitTextFillColor:"white"}}>
        Hello, <b>{session?.user?.name}</b>
      </h2>
      <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
        <img src={session?.user?.image} alt="" className="w-6 h-6"></img>
        <span className="px-2">
          {session?.user?.name}
        </span>
      </div>
    </div>
  </Layout>
}