import { useLocalSearchParams } from 'expo-router';
import ReportDamageScreen from '@/screens/report-damage-screen';

export default function ReportDamage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <ReportDamageScreen orderId={id} />;
}
