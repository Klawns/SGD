export default function ListasDespesas(){
    return (
        <>
                     <div className="flex justify-between items-center bg-gray-700 p-4 rounded-lg border border-gray-600">
      <div className="flex flex-col">
        {/* Título principal: passwordIdentify */}
        <h3 className="text-white text-lg font-semibold truncate text-left">
          {passwordIdentify}
        </h3>
        {/* Username/email menor abaixo */}
        <p className="text-gray-400 text-sm truncate text-left">{username}</p>
      </div>

      <div className="flex items-center space-x-4 text-gray-400">
        <button
          className="hover:text-white transition-colors duration-200"
          onClick={() => copyToClipboard(username)}
        >
          <User className="h-6 w-6" />
        </button>

        <button
          className="hover:text-white transition-colors duration-200"
          onClick={() => copyToClipboard(password)}
        >
          <Clipboard className="h-6 w-6" />
        </button>

        <button
          className="hover:text-white transition-colors duration-200"
          onClick={() => setShowEditButton(true)}
        >
          <Pencil className="h-6 w-6" />
        </button>

        <button
          className="hover:text-red-500 transition-colors duration-200"
          onClick={onDelete}
        >
          <Trash2 className="h-6 w-6" />
        </button>
      </div>
    </div>
        
        </>
    )
}