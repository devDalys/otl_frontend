import {api} from '@/api/api';
import {OpenPage} from '@/page_components/[id]/OpenPage';
import {SuccessResponse} from '@/types/responses';
import {notFound} from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

export const dynamic = 'force-dynamic';

type Response = SuccessResponse<{security: boolean}>;

export default async function Page({params}: Props) {
  const link = await api
    .get<Response>(`/link/checkout/${params.id}`)
    .catch(() => null);
  if (!link) return notFound();

  return <OpenPage withPassword={link.data.body.security} id={params.id} />;
}
