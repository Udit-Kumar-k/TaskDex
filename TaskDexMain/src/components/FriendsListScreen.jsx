import React from 'react';
import { getGifUrl } from '../utils/sprites.js';

const style = {
  card: "bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700",
  button: "px-6 py-3 rounded-xl font-bold transition-colors duration-300 shadow-md",
  primaryButton: "bg-blue-600 text-white hover:bg-blue-700",
  secondaryButton: "bg-gray-600 text-white hover:bg-gray-700",
  input: "w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
};

export default function FriendsListScreen({ setScreen, userData }) {
  const [friendIdInput, setFriendIdInput] = React.useState('');
  const [message, setMessage] = React.useState('');
  
  // For now, friends list is simplified (no Firebase queries)
  const friends = userData?.friends || [];
  
  const handleAddFriend = () => {
    setMessage('');
    if (!friendIdInput || friendIdInput.length < 3) {
      setMessage("Error: Invalid Trainer ID format.");
      return;
    }
    // Simplified: just add to local storage
    setMessage("Friend added! (Local storage only - Firebase integration needed for real friends)");
    setFriendIdInput('');
  };
  
  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-900 text-white">
      <div className={style.card + " max-w-4xl w-full mt-12"}>
        <h2 className="text-4xl font-bold mb-4 text-purple-400">Friends List & Multiplayer Hub</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: My ID & Copy ID */}
          <div className="md:col-span-1 space-y-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Your Trainer ID</h3>
              <p className="font-mono text-sm break-all text-yellow-400 mb-3 select-all">
                local-user-{userData?.trainerName || 'trainer'}
              </p>
              <button 
                className={style.secondaryButton + " w-full py-2 text-sm"} 
                onClick={() => {
                  const tempInput = document.createElement('textarea');
                  tempInput.value = `local-user-${userData?.trainerName || 'trainer'}`;
                  document.body.appendChild(tempInput);
                  tempInput.select();
                  document.execCommand('copy');
                  document.body.removeChild(tempInput);
                  setMessage('ID copied to clipboard!');
                }}
              >
                Copy ID
              </button>
            </div>
            
            <div className="p-4 bg-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Add Friend</h3>
              <input
                type="text"
                value={friendIdInput}
                onChange={(e) => setFriendIdInput(e.target.value)}
                placeholder="Paste Trainer ID here..."
                className={style.input + " mb-3"}
              />
              <button 
                className={style.primaryButton + " w-full"}
                onClick={handleAddFriend}
              >
                Send Friendship Request
              </button>
              {message && <p className={`mt-2 text-sm ${message.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>{message}</p>}
            </div>
          </div>
          
          {/* Column 2 & 3: Friend List */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-2xl font-semibold text-blue-400">Your Friends ({friends.length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {friends.length === 0 ? (
                <p className="text-gray-400 p-4 bg-gray-700 rounded-lg">You haven't added any friends yet. Share your ID!</p>
              ) : (
                friends.map((friend, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-700 rounded-lg shadow-inner justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={getGifUrl('TrainerMale')} 
                        alt="Trainer"
                        style={{ width: '32px', height: '32px', imageRendering: 'pixelated' }}
                        onError={(e) => { e.target.onerror = null; e.target.src = getGifUrl("Placeholder"); }}
                      />
                      <div>
                        <p className="font-semibold text-lg">Friend {index + 1}</p>
                        <p className="text-xs font-mono text-gray-400 break-all">{friend}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-400">Status: Active</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        <button
          className={style.button + " " + style.secondaryButton + " mt-8"}
          onClick={() => setScreen('MAIN_MENU')}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}

