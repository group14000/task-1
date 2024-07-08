import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const initialUsers = JSON.parse(localStorage.getItem('users')) || [
    { id: 0, name: 'Abhijeet Kumar', role: 'Developer', email: 'abhijeet@gmail.com', isEditing: false },
    { id: 1, name: 'Aman', role: 'Singer', email: 'Amanjeet@hg.com', isEditing: false },
    { id: 2, name: 'test', role: 'testrule', email: 'test@gmail.com', isEditing: false }
  ];

  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ name: '', role: '', email: '' });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleEditChange = (e, id) => {
    const { name, value } = e.target;
    setUsers(users.map(user => user.id === id ? { ...user, [name]: value } : user));
  };

  const handleNewUserChange = e => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const saveNewUser = () => {
    setUsers([...users, { ...newUser, id: users.length, isEditing: false }]);
    setNewUser({ name: '', role: '', email: '' });
  };

  const toggleEdit = id => {
    setUsers(users.map(user => user.id === id ? { ...user, isEditing: !user.isEditing } : user));
  };

  const saveEdit = id => {
    setUsers(users.map(user => user.id === id ? { ...user, isEditing: false } : user));
  };

  const deleteUser = id => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => setNewUser({ id: users.length, name: '', role: '', email: '', isEditing: true })} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Create</button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Role</th>
            <th className="py-2">Email</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            user.isEditing ? (
              <tr key={user.id}>
                <td className="py-2">{user.id}</td>
                <td className="py-2"><input name="name" value={user.name} onChange={e => handleEditChange(e, user.id)} /></td>
                <td className="py-2"><input name="role" value={user.role} onChange={e => handleEditChange(e, user.id)} /></td>
                <td className="py-2"><input name="email" value={user.email} onChange={e => handleEditChange(e, user.id)} /></td>
                <td className="py-2">
                  <button onClick={() => saveEdit(user.id)} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Save</button>
                  <button onClick={() => toggleEdit(user.id)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={user.id}>
                <td className="py-2">{user.id}</td>
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.role}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">
                  <button onClick={() => toggleEdit(user.id)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                  <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete Account</button>
                </td>
              </tr>
            )
          ))}
          {newUser.isEditing && (
            <tr>
              <td className="py-2">{users.length}</td>
              <td className="py-2"><input name="name" value={newUser.name} onChange={handleNewUserChange} /></td>
              <td className="py-2"><input name="role" value={newUser.role} onChange={handleNewUserChange} /></td>
              <td className="py-2"><input name="email" value={newUser.email} onChange={handleNewUserChange} /></td>
              <td className="py-2">
                <button onClick={saveNewUser} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Save</button>
                <button onClick={() => setNewUser({ name: '', role: '', email: '', isEditing: false })} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
