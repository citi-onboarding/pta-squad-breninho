import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogoCITiPet } from "@/assets";
import { Cross2Icon } from "@radix-ui/react-icons"

function Modalcadastro(){
    const [email, setEmail] = React.useState("");
    const [error, setError] = React.useState("");

    function isValidEmail(email: string) {
        // Simple regex for email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const handleRegisterUser = async () => {
        setError("");
        if (!isValidEmail(email)) {
            setError("Insira um e-mail válido.");
            return;
        }
        await fetch("http://localhost:3001/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: email,
                lastName: "",
                age: 0
            }),
        });
    };

    return(
        <div>
            <div 
            className="flex flex-col h-[423px] w-[408px] bg-[#FFFFFF] rounded-[24px] p-[48px] gap-[29px] items-center font-[SF Pro Display]">
                <div className="w-full flex flex-row justify-between">
                    <Image className="ml-[20%]" src={LogoCITiPet} alt="logo"/>
                    <Button className="h-[24px] w-[24px]" size="icon" variant="ghost">
                        <Cross2Icon></Cross2Icon>
                    </Button>
                </div>
                <div className="flex flex-col items-center">
                    <p><b>Cadastro finalizado!</b> Envie o</p>
                    <p>comprovante para o <b>tutor</b></p>
                </div>
                <div className="flex flex-col gap-[12px] text-[16px]">
                    <p>
                        <b>E-mail</b>
                    </p>
                    <div>
                        <input
                            type="text"
                            placeholder="Digite Aqui..."
                            className="h-[50px] w-[312px] border border-[#101010] rounded-[8px] p-[16px]"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <Button 
                    className="h-[42px] w-[312px] bg-[#50E678] rounded-[24px] shadow-[0 4px 4px #0000001A]"
                    onClick={handleRegisterUser}
                >
                    Enviar
                </Button>
                <div className="min-h-[0px] flex items-center justify-center">
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
            </div>
        </div>
    )
}

export default Modalcadastro;