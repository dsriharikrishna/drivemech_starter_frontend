"use client";

import React from "react";
import { Check, Calendar, Clock, Users } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  subtitle?: string;
  time: string;
  icon: React.ReactNode;
  bgColor: string;
  iconBg: string;
}

const RecentActivity: React.FC = () => {
  const activities: Activity[] = [
    {
      id: "1",
      title: "Service completed for",
      subtitle: "Honda City",
      time: "10 mins ago",
      icon: <Check className="text-white" strokeWidth={2.5} />,
      bgColor: "bg-green-50",
      iconBg: "bg-green-500",
    },
    {
      id: "2",
      title: "New appointment booked",
      time: "25 mins ago",
      icon: <Calendar className="text-white" strokeWidth={2.5} />,
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-500",
    },
    {
      id: "3",
      title: "Payment received",
      subtitle: "$123.50",
      time: "1 hour ago",
      icon: <Clock className="text-white" strokeWidth={2.5} />,
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-500",
    },
    {
      id: "4",
      title: "New customer added",
      time: "2 hour ago",
      icon: <Users className="text-white" strokeWidth={2.5} />,
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-500",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
          <p className="text-sm text-gray-500 mt-1">Last 2 hours</p>
        </div>

        <button className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:underline">
          View All <span>→</span>
        </button>
      </div>

      {/* Activity cards */}
      <div className="flex flex-col gap-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`rounded-lg p-4 ${activity.bgColor}`}
          >
            <div
              className={`${activity.iconBg} w-11 h-11 rounded-xl flex items-center justify-center`}
            >
              {activity.icon}
            </div>

            <div className="text-base font-semibold text-gray-900">
              {activity.title}
            </div>

            {activity.subtitle && (
              <div className="text-base font-semibold text-gray-900">
                {activity.subtitle}
              </div>
            )}

            <div className="text-sm text-gray-500 mt-2">{activity.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
