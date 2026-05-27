import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigator = useNavigate();

  function entrar() {
    navigator("/");
  }
  return (
    <main className="h-screen bg-red-600 flex items-center justify-center background-login">
      <form className="flex flex-col gap-6 bg-white py-8 px-16 rounded-lg shadow-xl">
        <div>
          <h2 className="text-center font-bold text-2xl">Login</h2>
        </div>
        <div className="flex flex-col gap-2">
          <label>
            Email <span className="font-bold text-red-600">*</span>
          </label>
          <input
            type="text"
            className="w-84 p-3 outline-none border border-[#38953e] bg-white rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>
            Senha <span className="font-bold text-red-600">*</span>
          </label>
          <input
            type="text"
            className="w-84 p-3 outline-none border border-[#38953e] bg-white rounded-lg"
          />
        </div>
        <div>
          <button
            onClick={() => entrar()}
            className="w-full py-4 bg-[#38953e] text-white font-bold text-2xl rounded-md transition hover:cursor-pointer hover:bg-[#347038]"
          >
            Entrar
          </button>
        </div>
        <div>
          <p className="text-center">
            Não tem uma conta?{" "}
            <a href="/cadastro" className="font-bold text-[#38953e]">
              Criar conta
            </a>
          </p>
        </div>
      </form>
    </main>
  );
}
