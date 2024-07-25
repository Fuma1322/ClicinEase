import { getInboxMessages, getPatientAppointments } from '@/actions/appointments';
import ListPannel from '@/components/Dashboard/Doctor/ListPannel';
import PannelHeader from '@/components/Dashboard/Doctor/PannelHeader';
import NotAuthorised from '@/components/NotAuthorised';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authOptions } from '@/lib/auth';
import { Calendar, Mail } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React, { ReactNode } from 'react'

export default async function AppointmentLayout({children}:{children: ReactNode;}) {
    const session = await getServerSession(authOptions);
  const user = session?.user
  if (user?.role !=="USER"){
    return (
      <NotAuthorised/>
    )
  }
  const messages = (await getInboxMessages(user.id)).data || [];
  const sentMessages = (await getInboxSentMessages(user.id)).data || [];
    return (
    <div>
      
    <div className="grid grid-cols-12">
    <div className="col-span-4 py-3 border-r border-gray-100">
     <PannelHeader title='Inbox Messages' count={messages.length ?? 0} icon={Mail}/>
    <div className="px-3">
    <Tabs defaultValue="recieved" className="">
      <TabsList>
        <TabsTrigger value="recieved">
          Recieved({messages.length.toString().padStart(2, "0")})
        </TabsTrigger>
        <TabsTrigger value="sent">
          Sent({sentMessages.length.toString().padStart(2, "0")})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="recieved">
        <MailListPanel messages={messages} role={user.role} />
      </TabsContent>
      <TabsContent value="sent">
        <MailListPanel messages={sentMessages} role={user.role} />
      </TabsContent>
    </Tabs>
    </div>
    </div>
     <div className="col-span-8"> 
         {children}
     </div>
    </div>
     
 </div>
  );
}