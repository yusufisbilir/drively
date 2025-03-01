const getUsageSummary = (totalSpace: any) => {
  return [
    {
      title: 'Documents',
      size: totalSpace.document.size,
      latestDate: totalSpace.document.latestDate,
      icon: 'FileText',
      url: '/documents',
    },
    {
      title: 'Images',
      size: totalSpace.image.size,
      latestDate: totalSpace.image.latestDate,
      icon: 'LucideImage',
      url: '/images',
    },
    {
      title: 'Media',
      size: totalSpace.video.size + totalSpace.audio.size,
      latestDate:
        totalSpace.video.latestDate > totalSpace.audio.latestDate
          ? totalSpace.video.latestDate
          : totalSpace.audio.latestDate,
      icon: 'Video',
      url: '/media',
    },
    {
      title: 'Others',
      size: totalSpace.other.size,
      latestDate: totalSpace.other.latestDate,
      icon: 'MoreHorizontal',
      url: '/others',
    },
  ];
};

export default getUsageSummary;
