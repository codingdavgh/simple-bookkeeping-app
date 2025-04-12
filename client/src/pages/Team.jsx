import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Team() {
  const { token, user } = useAuth();
  const [members, setMembers] = useState([]);
  const [email, setEmail] = useState('');

  const fetchTeam = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/team/${user.teamId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setMembers(data.members);
  };

  const handleInvite = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/team/invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ email })
    });
    setEmail('');
    fetchTeam();
  };

  useEffect(() => {
    if (user?.teamId) fetchTeam();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Team Members</h1>

      <ul className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-2">
        {members.map((m) => (
          <li key={m._id} className="border-b py-1">{m.email}</li>
        ))}
      </ul>

      <div className="space-y-2">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Invite teammate by email"
          className="w-full p-2 rounded border dark:bg-gray-700"
        />
        <button
          onClick={handleInvite}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Invite
        </button>
      </div>
    </div>
  );
}

export default Team;
