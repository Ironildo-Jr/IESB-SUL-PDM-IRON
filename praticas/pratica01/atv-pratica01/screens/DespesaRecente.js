import DespesaSaida from "../components/despesa/DespesaSaida";

function DespesaRecente() {
  function filtrarUltimos7Dias(despesas) {
    const hoje = new Date();
    const seteDiasAtras = new Date(hoje);
    seteDiasAtras.setDate(hoje.getDate() - 7);
    return despesas.filter((despesa) => despesa.data >= seteDiasAtras && despesa.data <= hoje);
  }

  const DUMMY_DESPESAS = [
    {
      id: "1",
      descricao: "Aluguel",
      valor: 1200.0,
      data: new Date(2026, 2, 26),
    },
    {
      id: "2",
      descricao: "Supermercado",
      valor: 450.5,
      data: new Date(2026, 2, 30),
    },
  ];
  return <DespesaSaida despesas={filtrarUltimos7Dias(DUMMY_DESPESAS)} periodo={"Últimos 7 Dias"} />;
}

export default DespesaRecente;