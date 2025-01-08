'use client';

import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    person: 'Natalia',
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'posts'));
        const postsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsList);
      } catch (error) {
        console.error('Erro ao buscar postagens:', error);
      }
    };

    fetchPosts();
  }, []);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(firestore, 'posts'), {
        ...formData,
        startDate: formData.startDate ? formData.startDate.toISOString() : null,
        endDate: formData.endDate ? formData.endDate.toISOString() : null,
      });
      setIsFormOpen(false);
      alert('Postagem adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar postagem:', error);
      alert('Falha ao adicionar postagem.');
    }
  };

  const deletePost = async (id) => {
    try {
      const postDoc = doc(firestore, 'posts', id);
      await deleteDoc(postDoc);
      setPosts(posts.filter((post) => post.id !== id));
      alert('Postagem excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir postagem:', error);
      alert('Falha ao excluir postagem.');
    }
  };

  return (
    <div className={`bg-gradient-to-r from-gray-50 to-gray-200 min-h-screen ${poppins.className}`}>
      {/* Navbar */}
      <nav className="bg-white px-6 py-4 flex justify-between items-center shadow-lg rounded-lg">
        <div className="text-sm font-bold text-gray-800">Jaqueline # Jaquelino</div>
        <div>
          <button
            onClick={toggleForm}
            className="text-white px-4 py-1.5 rounded-full font-medium bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition duration-300"
          >
            Adicionar nota
          </button>
        </div>
      </nav>

      {/* Formulário para Adicionar Postagem */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Adicionar Postagem</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Título"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>
              <div className="mb-4">
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Conteúdo"
                  rows="4"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                />
              </div>
              <div className="mb-4">
                <select
                  className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.person}
                  onChange={(e) => handleInputChange('person', e.target.value)}
                >
                  <option value="Natalia">Natalia</option>
                  <option value="Erivan">Erivan</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Data de Início</label>
                <DatePicker
                  selected={formData.startDate}
                  onChange={(date) => handleInputChange('startDate', date)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Data de Término</label>
                <DatePicker
                  selected={formData.endDate}
                  onChange={(date) => handleInputChange('endDate', date)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="text-white px-6 py-2 rounded-full font-medium bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition duration-300"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabela de Postagens */}
      <div className="px-6 mt-8">
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">Pessoa</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">Descrição</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">Data de Início</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">Data de Término</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-500">{post.person}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{post.content}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{post.startDate ? new Date(post.startDate).toLocaleDateString() : ''}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{post.endDate ? new Date(post.endDate).toLocaleDateString() : ''}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <button
                      onClick={() => deletePost(post.id)} 
                      className="text-red-500 hover:text-red-700 transition duration-300"
                    >
                      🗑️ Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleForm}
          className="text-white w-16 h-16 rounded-full font-medium bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition duration-300 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(255,255,255,1)"><path d="M6.93912 14.0328C6.7072 14.6563 6.51032 15.2331 6.33421 15.8155C7.29345 15.1189 8.43544 14.6767 9.75193 14.5121C12.2652 14.198 14.4976 12.5385 15.6279 10.4537L14.1721 8.99888L15.5848 7.58417C15.9185 7.25004 16.2521 6.91614 16.5858 6.58248C17.0151 6.15312 17.5 5.35849 18.0129 4.2149C12.4197 5.08182 8.99484 8.50647 6.93912 14.0328ZM17 8.99739L18 9.99669C17 12.9967 14 15.9967 10 16.4967C7.33146 16.8303 5.66421 18.6636 4.99824 21.9967H3C4 15.9967 6 1.99669 21 1.99669C20.0009 4.99402 19.0018 6.99313 18.0027 7.99402C17.6662 8.33049 17.3331 8.66382 17 8.99739Z"></path></svg>
        </button>
      </div>
    </div>
  );
}
