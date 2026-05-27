import { useContext, useMemo, useState } from "react";
import { MoneyContext } from "../../contexts/GlobalState";
import { globalStyles } from "../../styles/globalStyles";
import SummaryItem from "../../components/SummaryItem";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors } from "../../constants/colors";
import { Svg, Path, Circle } from "react-native-svg";

const monthNames = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    `L ${x} ${y}`,
    "Z",
  ].join(" ");
};

export default function Summary() {
  const [transactions, , categories] = useContext(MoneyContext);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const date = new Date(item.date);
      return (
        !Number.isNaN(date.getTime()) &&
        date.getMonth() === selectedMonth &&
        date.getFullYear() === selectedYear
      );
    });
  }, [transactions, selectedMonth, selectedYear]);

  const totals = useMemo(() => {
    const totalsObject = categories.reduce((acc, category) => {
      acc[category.name] = 0;
      return acc;
    }, { sum: 0 });

    for (const item of filteredTransactions) {
      const categoryName = item.category;
      const value = Number(item.value) || 0;

      if (totalsObject[categoryName] === undefined) {
        totalsObject[categoryName] = 0;
      }

      totalsObject[categoryName] += value;
      totalsObject.sum += categoryName === "income" ? value : -value;
    }

    return totalsObject;
  }, [filteredTransactions, categories]);

  const chartData = categories
    .map((category) => ({
      ...category,
      total: Math.max(0, totals[category.name] || 0),
    }))
    .filter((category) => category.total > 0);

  const totalChartValue = chartData.reduce((sum, category) => sum + category.total, 0);

  let startAngle = 0;
  const pieSlices = chartData.map((item) => {
    const percent = totalChartValue === 0 ? 0 : item.total / totalChartValue;
    const sweepAngle = percent * 360;
    const endAngle = startAngle + sweepAngle;
    const path = describeArc(90, 90, 80, startAngle, endAngle);
    const slice = { path, fill: item.background, label: item.displayName, value: item.total };
    startAngle = endAngle;
    return slice;
  });

  const valueStyle =
    totals.sum > 0 ? globalStyles.positiveText : globalStyles.negativeText;

  return (
    <ScrollView style={globalStyles.screenContainer}>
      <View style={globalStyles.content}>
        <View style={styles.filterRow}>
          <View style={styles.filterBlock}>
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(value) => setSelectedMonth(value)}
              itemStyle={{ color: colors.primaryText }}
            >
              {monthNames.map((label, index) => (
                <Picker.Item key={label} label={label} value={index} />
              ))}
            </Picker>
          </View>
          <View style={styles.filterBlock}>
            <Picker
              selectedValue={selectedYear}
              onValueChange={(value) => setSelectedYear(value)}
              itemStyle={{ color: colors.primaryText }}
            >
              {[new Date().getFullYear() - 1, new Date().getFullYear(), new Date().getFullYear() + 1].map(
                (year) => (
                  <Picker.Item key={year} label={String(year)} value={year} />
                ),
              )}
            </Picker>
          </View>
        </View>

        <View style={styles.chartWrapper}>
          {pieSlices.length === 0 ? (
            <Text style={globalStyles.inputLabel}>Nenhum dado para o período selecionado.</Text>
          ) : (
            <Svg width={180} height={180} viewBox="0 0 180 180">
              {pieSlices.map((slice, index) => (
                <Path key={index} d={slice.path} fill={slice.fill} />
              ))}
              <Circle cx="90" cy="90" r="45" fill={colors.background} />
            </Svg>
          )}
        </View>

        <View style={styles.legend}>
          {chartData.map((category) => (
            <View key={category.name} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: category.background }]} />
              <Text style={styles.legendText}>
                {category.displayName} ({category.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })})
              </Text>
            </View>
          ))}
        </View>

        {filteredTransactions.length === 0 ? (
          <></>
        ) : (
          <>
            <View style={globalStyles.line} />

            {categories.map((category) => (
              <SummaryItem
                key={category.name}
                category={category.name}
                value={totals[category.name] || 0}
              />
            ))}

            <View style={globalStyles.line} />

            <View style={styles.balance}>
              <Text style={styles.balanceText}>Saldo</Text>
              <Text style={valueStyle}>
                {totals.sum.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
   filterRow: {
    flexDirection: "row",
    gap: 8,
  },
  filterBlock: {
    flex: 1,
  },
  chartWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  legend: {
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendColor: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
  },
  legendText: {
    color: colors.primaryText,
    fontSize: 14,
  },
  balance: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceText: {
    fontSize: 18,
    color: colors.primaryText,
    fontWeight: 800,
  },
  emptyText: {
    color: colors.secondaryText,
    fontSize: 14,
  },
});
