import localFont from 'next/font/local';

export const notoSansArmenian = localFont({
  src: [
    {
      path: '../font/hy/NotoSansArmenian-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../font/hy/NotoSansArmenian-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../font/hy/NotoSansArmenian-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../font/hy/NotoSansArmenian-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const notoSans = localFont({
  src: [
    {
      path: '../font/NotoSans-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../font/NotoSans-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../font/NotoSans-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
  ],
});
