import {redirect} from "next/navigation";

type Props = {
  params: Promise<{id: string}>;
};

export default async function LegacyProjectPage({params}: Props) {
  const {id} = await params;
  redirect(`/fa/projects/${id}`);
}
