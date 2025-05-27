import TopBar from "@/components/top-bar"
import CardConsulta from "@/components/card-consulta";
import { Button } from "@/components/ui/button";

const PageAtendimento = () => {
    return(
        <body>
            {/* Top bar */}
            <TopBar></TopBar>
            <section>
                {/* Call back page Atendimento */}
                <div></div>
                {/* Search components */}
                <div></div>
                {/* Organizer components */}
                <div></div>
                {/* Status Pet cards */}
                <div>
                    <CardConsulta date="18/02" time="13:00" nameOwner="João Alves" namePet="Luna" nameDoctor="Dr. José Carlos" textStatus="Primeira Consulta"></CardConsulta>
                    <CardConsulta date="18/02" time="13:00" nameOwner="João Alves" namePet="Luna" nameDoctor="Dr. José Carlos" textStatus="Retorno"></CardConsulta>
                    <CardConsulta date="18/02" time="13:00" nameOwner="João Alves" namePet="Luna" nameDoctor="Dr. José Carlos" textStatus="Check-up"></CardConsulta>
                    <CardConsulta date="18/02" time="13:00" nameOwner="João Alves" namePet="Luna" nameDoctor="Dr. José Carlos" textStatus="Vacinação"></CardConsulta>
                    <CardConsulta date="18/02" time="13:00" nameOwner="João Alves" namePet="Luna" nameDoctor="Dr. José Carlos" textStatus="Vacinação"></CardConsulta>
                    <CardConsulta date="18/02" time="13:00" nameOwner="João Alves" namePet="Luna" nameDoctor="Dr. José Carlos" textStatus="Primeira Consulta"></CardConsulta>
                </div>
                {/* New Consults Button */}
                <Button></Button>
            </section>
        </body>
    )
};

export default PageAtendimento;