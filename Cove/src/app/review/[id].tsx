import { useLocalSearchParams } from 'expo-router';
import AddReviewScreen from '@/screens/add-review-screen';

export default function ReviewProduct() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <AddReviewScreen productId={id} />;
}
