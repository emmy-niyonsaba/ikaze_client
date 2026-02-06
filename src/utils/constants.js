
  // Filter options
  export const statusOptions = [
    { value: 'ALL', label: 'All Status', color: 'gray' },
    { value: 'PENDING', label: 'Pending', color: 'yellow' },
    { value: 'CONFIRMED', label: 'Confirmed', color: 'blue' },
    { value: 'COMPLETED', label: 'Completed', color: 'green' },
    { value: 'CANCELLED', label: 'Cancelled', color: 'red' },
    { value: 'NO_SHOW', label: 'No Show', color: 'orange' },
    { value: 'RESCHEDULED', label: 'Rescheduled', color: 'purple' }
  ];

 export  const collegeOptions = [
    { value: 'ALL', label: 'All Colleges' },
    { value: 'RPTUMBA', label: 'RP Tumba' },
    { value: 'RPKIGALI', label: 'RP Kigali' },
    { value: 'RPKARONGI', label: 'RP Karongi' }
  ];

  export const dateOptions = [
    { value: 'ALL', label: 'All Dates' },
    { value: 'TODAY', label: 'Today' },
    { value: 'TOMORROW', label: 'Tomorrow' },
    { value: 'THIS_WEEK', label: 'This Week' },
    { value: 'NEXT_WEEK', label: 'Next Week' },
    { value: 'PAST', label: 'Past Appointments' },
    { value: 'UPCOMING', label: 'Upcoming' }
  ];


   export const getStatusColor = (status) => {
      switch(status) {
        case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'CONFIRMED': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'COMPLETED': return 'bg-green-100 text-green-800 border-green-200';
        case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
        case 'NO_SHOW': return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'RESCHEDULED': return 'bg-purple-100 text-purple-800 border-purple-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    };
  
   export  const getPriorityColor = (priority) => {
      switch(priority) {
        case 'URGENT': return 'bg-red-100 text-red-800';
        case 'HIGH': return 'bg-orange-100 text-orange-800';
        case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
        case 'LOW': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
  
 export   const getCollegeName = (collegeCode) => {
      const college = collegeOptions.find(c => c.value === collegeCode);
      return college ? college.label : collegeCode;
    };
  
 export   const formatDateTime = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };
  
  export  const formatTime = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    };
  
   export  const calculateDuration = (startTime, endTime) => {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const diffMs = end - start;
      const diffMinutes = Math.round(diffMs / (1000 * 60));
      
      if (diffMinutes < 60) {
        return `${diffMinutes} min`;
      } else {
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
      }
    };
  