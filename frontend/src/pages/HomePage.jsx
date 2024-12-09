import React from 'react'
import { useChatStore } from "../store/useChatStore.js"
import Sidebar from '../components/Sidebar.jsx';
import NoChatSelected from '../components/NoChatSelected.jsx';
import ChatContainer from './ChatContainer.jsx';

function HomePage() {

  const { selectedUser } = useChatStore();

  return (
    <div className='h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;

// import React from 'react';
// import { useChatStore } from "../store/useChatStore.js";
// import Sidebar from '../components/Sidebar.jsx';
// import NoChatSelected from '../components/NoChatSelected.jsx';
// import ChatContainer from './ChatContainer.jsx';

// function HomePage() {
//   const { selectedUser } = useChatStore();

//   return (
//     <div className="h-screen bg-base-200">
//       <div className="flex items-center justify-center pt-20 px-4">
//         <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
//           <div className="flex h-full rounded-lg overflow-hidden">
//             <div className={`w-full ${selectedUser ? 'hidden md:block' : 'block'}`}>
//               <Sidebar />
//             </div>
//             <div className={`flex-1 overflow-hidden ${selectedUser ? 'block' : 'hidden md:block'}`}>
//               {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;
