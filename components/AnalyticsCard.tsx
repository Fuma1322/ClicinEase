"use client"

import { DollarSign } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DoctorAnalyticProps } from "@/actions/stats"
import Link from "next/link"

export default function AnalyticsCard({data}:{data:DoctorAnalyticProps}) {
    const Icon = data.icon
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{data.title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data.unit}{data.count}</div>
        <Link href={data.detailLink} className="text-xs text-muted-foreground">View Details</Link>
      </CardContent>
    </Card>
  )
}
