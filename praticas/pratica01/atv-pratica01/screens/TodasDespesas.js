import DespesaSaida from "../components/despesa/DespesaSaida";

function TodasDespesas() {
  const DUMMY_DESPESAS = [
    {
      id: "1",
      descricao: "Aluguel",
      valor: 1200.0,
      data: new Date(2025, 0, 1),
    },
    {
      id: "2",
      descricao: "Supermercado",
      valor: 450.5,
      data: new Date(2025, 0, 5),
    },
    {
      id: "3",
      descricao: "Transporte",
      valor: 300.0,
      data: new Date(2025, 0, 10),
    },
  ];
  return <DespesaSaida despesas={DUMMY_DESPESAS} periodo={"Total"} />;
}

export default TodasDespesas;
