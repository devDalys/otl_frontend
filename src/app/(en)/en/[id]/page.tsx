import {ipApi} from '@/api/ipApi';
import {NotFoundSlugPage} from '@/components/NotFoundSlug/NotFoundSlug';
import {ToManyRequestPage} from '@/components/ToManyRequest/ToManyRequest';
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
    .catch((err) => err);
  if (link?.status === 429) return <ToManyRequestPage />;
  if (!link?.data?.body) return <NotFoundSlugPage />;

  return <OpenPage withPassword={link.data.body.security} id={params.id} />;
}
