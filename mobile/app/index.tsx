// src/components/AgendaScreen.tsx
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

interface ConsultaParaCard {
  animal: string;
  date: string;
  time: string;
  nameOwner: string;
  phoneOwner: string;
  status: string;
}

const mapAppointmentToCard = (appt: Appointment): ConsultaParaCard => ({
  animal: appt.animal,
  date: appt.date,
  time: appt.time,
  nameOwner: appt.nameOwner,
  phoneOwner: appt.phoneOwner,
  status: appt.status,
});

export default function AgendaScreen() {
  const [consultas, setConsultas] = useState<ConsultaParaCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("morning");

  const fetchConsultas = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: chamada real
      const mockAppointments: Appointment[] = [];
      setConsultas(mockAppointments.map(mapAppointmentToCard));
    } catch {
      setError("Erro ao buscar consultas.");
    } finally {
      setLoading(false);
    }
  };

  const filtrarPeriodo = (arr: ConsultaParaCard[], p: Period) =>
    !p ? arr : arr.filter(() => true); // TODO: lógica real

  useEffect(() => {
    fetchConsultas();
  }, []);

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
                namePet={c.animal}
                nameDoctor={""}
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
