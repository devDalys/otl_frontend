import {ipApi} from '@/api/ipApi';
import {NotFoundSlugPage} from '@/components/NotFoundSlug/NotFoundSlug';
import {OpenPage} from '@/page_components/[id]/OpenPage';
import {SuccessResponse} from '@/types/responses';
import {headers} from 'next/headers';

type Props = {
  params: {
    id: string;
  };
};

export const dynamic = 'force-dynamic';

type Response = SuccessResponse<{security: boolean}>;

export default async function Page({params}: Props) {
  const realIp = headers().get('x-real-ip') ?? '';
  const link = await ipApi(realIp)
    .get<Response>(`/link/checkout/${params.id}`)
    .catch(() => null);
  if (!link) return <NotFoundSlugPage />;

  return <OpenPage withPassword={link.data.body.security} id={params.id} />;
}
