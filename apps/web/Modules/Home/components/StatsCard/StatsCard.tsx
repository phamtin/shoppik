import { colorStatMapping } from 'Modules/home/home.constant';

import c from './statscard.module.css';

interface StatsCardProps {
  data: {
    dataType: string;
    value: string;
  };
}

export default ({ data }: StatsCardProps) => {
  const { dataType, value } = data;
  return <div>2022</div>;
};
