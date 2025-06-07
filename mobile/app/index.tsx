import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import CardConsultaMobile from "../src/components/card-consulta-mobile";
import CardHorarioMobile from "../src/components/card-horario-mobile";
import CardVerdeMobile from "../src/components/card-verde-mobile";
import { logoCiti } from "../src/assets";

type Period = "morning" | "afternoon" | "night" | "";

interface Appointment {
  animal: string;
  date: string;
  time: string;
  nameOwner: string;
  phoneOwner: string;
  status: string;
}

interface ConsultaCard {
  animal: string;
  date: string;
  time: string;
  nameOwner: string;
  namePet: string;
  phoneOwner: string;
  status: string;
  nameDoctor: string;
}

function traduzirEspecie(species: string): "Dog" | "Cat" | "Pig" | "Horse" | "Sheep" | "Cow" {
  switch (species) {
    case "dog": return "Dog";
    case "cat": return "Cat";
    case "pig": return "Pig";
    case "horse": return "Horse";
    case "sheep": return "Sheep";
    case "cow": return "Cow";
    default: return "Dog";
  }
}

function traduzirStatus(tipo: string): "Primeira Consulta" | "Check-up" | "Retorno" | "Vacinação" | "" {
  switch (tipo) {
    case "firstAppointment": return "Primeira Consulta";
    case "checkup": return "Check-up";
    case "return": return "Retorno";
    case "vaccination": return "Vacinação";
    default: return "";
  }
}

function formatarData(dateStr: string): string {
  const date = new Date(dateStr);
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  return `${dia}/${mes}`;
}

const mapAppointmentToCard = (appt: any): ConsultaCard => ({
  animal: traduzirEspecie(appt.patient?.species),
  date: formatarData(appt.date),
  time: appt.time,
  nameOwner: appt.patient?.tutorName || "",
  namePet: appt.patient?.name || "",
  phoneOwner: "", 
  status: traduzirStatus(appt.appointmentType),
  nameDoctor: appt.doctor || "", 
});

export default function AgendaScreen() {
  const [consultas, setConsultas] = useState<ConsultaCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("morning");

  useEffect(() => {
    fetchConsultas();
  }, [selectedPeriod]);

   const fetchConsultas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://192.168.0.195:3001/mobile/agenda?period=' + selectedPeriod); //ATUALIZE COM O IP DA SUA MÁQUINA
      const data = await response.json();
      setConsultas(data.map(mapAppointmentToCard));
    } catch {
      setError("Erro ao buscar consultas.");
    } finally {
      setLoading(false);
    }
  };

  const filtrarPeriodo = (arr: ConsultaCard[], p: Period) => {
  if (!p) return arr;
  // Converte hora para minutos para facilitar a comparação
  const toMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };
  return arr.filter((c) => {
    const minutos = toMinutes(c.time);
    if (p === "morning") return minutos >= 360 && minutos < 720;    // 06:00 - 12:00
    if (p === "afternoon") return minutos >= 720 && minutos < 1080; // 12:00 - 18:00
    if (p === "night") return minutos >= 1080 && minutos < 1440;    // 18:00 - 24:00
    return true;
  });
};;

  const consultasFiltradas = filtrarPeriodo(consultas, selectedPeriod);
  const allowedStatus = [
    "",
    "Primeira Consulta",
    "Check-up",
    "Retorno",
    "Vacinação",
  ] as const;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerClassName="pt-[91px] px-6 pb-5 items-center"
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchConsultas} />
        }
      >
        {/* Logo 143x54 e centralizada */}
        <Image
          source={logoCiti}
          resizeMode="contain"
          className="w-[143px] h-[54px] mb-4"
        />

        {/* Título e subtítulo alinhados à margem */}
        <Text className="w-full text-[24px] font-bold text-[#1F1F1F]">
          Sua agenda
        </Text>
        <Text className="w-full mt-1 text-[14px] text-[#555555]">
          Veja aqui todos os meus pacientes agendados para hoje.
        </Text>

        {/* Picker de período centralizado e com margens iguais */}
        <View className="mt-8 w-full flex-row justify-center">
          <CardHorarioMobile
            onSelectPeriod={(p) =>
              setSelectedPeriod((old) => (old === p ? "" : p))
            }
            selectedPeriod={selectedPeriod}
          />
        </View>

        {/* Loading indicator */}
        {loading && (
          <ActivityIndicator
            color="#50E678"
            size="large"
            className="mt-8"
          />
        )}

        {/* Erro */}
        {error && (
          <Text className="w-full mt-8 text-[14px] text-[#E53E3E]">
            {error}
          </Text>
        )}

        {/* Mensagem de vazio */}
        {!loading && !error && consultasFiltradas.length === 0 && (
          <View className="w-full mt-8 items-center">
            <Text className="text-[14px] text-[#888888]">
              Não há consultas para o período selecionado.
            </Text>
          </View>
        )}

        {/* Lista de consultas */}
        {consultasFiltradas.map((c, i) => {
          const status = allowedStatus.includes(c.status as any)
            ? (c.status as typeof allowedStatus[number])
            : "";

          return (
            <View key={i} className="mt-8 w-full flex-row justify-center">
              <CardConsultaMobile
                animal={
                  (["Cat", "Cow", "Dog", "Horse", "Pig", "Sheep"].includes(
                    c.animal
                  )
                    ? (c.animal as any)
                    : "Dog")
                }
                namePet={c.namePet}
                nameDoctor={c.nameDoctor}
                date={c.date}
                time={c.time}
                nameOwner={c.nameOwner}
                status={status}
              />
            </View>
          );
        })}

        <View className="h-10" />
      </ScrollView>

      <CardVerdeMobile />
    </SafeAreaView>
  );
}
