export const formatDate = (dateString: Date): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', 
    { year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    }
  ).format(date);
};
