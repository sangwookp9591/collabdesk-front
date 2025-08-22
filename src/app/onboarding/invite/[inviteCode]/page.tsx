export default async function Page({ params }: { params: Promise<{ inviteCode: string }> }) {
  const { inviteCode } = await params;

  return <div>{inviteCode}</div>;
}
