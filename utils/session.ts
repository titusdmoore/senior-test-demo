import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

let _session: any;

export async function getSession() {
  if ( !_session ) {
    _session = await getServerSession( authOptions );
  }
  
  return _session;
}
