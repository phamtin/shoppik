import {Button, Typography} from 'ui/components/Core';
import useStyle from './MarketDetail.style';
import Image from 'next/image';
import InfoItem from '../../components/InfoItem/InfoItem';
import {Chart} from 'react-iconly';
import {useRouter} from 'next/router';
import ProductCard from '../../components/ProductCard/ProductCard';

const MarketDetail = () => {
  const {styles} = useStyle();
  const router = useRouter();

  const goBack = () => router.back();

  return (
    <div className={styles.wrapper}>
      <div className="titleWrapper">
        <Button onClick={goBack} icon={<Image src="/images/ic-back.png" alt="back" height={12} width={7} />} className="iconBack" />
        <Typography.Title className="title">Market Detail</Typography.Title>
      </div>
      <div className='productWrapper'>
        <Image
          alt="example"
          src="/images/product-detail.png"
          width={490}
          height={490}
          style={{borderRadius: 20}}
        />
        <div className="productGap" />
        <div className="productInfo">
          <Typography.Title className="productName">Project Sun-Glass</Typography.Title>
          <Typography.Paragraph className="productDesc">
            A collection of 10,000 utility-enabled PFPs that feature a richly diverse and unique pool of rarity-powered traits.
          </Typography.Paragraph>
          <div className="productItemInfo">
            <InfoItem image="/images/ava1.png" title="Created By" content="Perperzon" />
            <InfoItem image="/images/ava2.png" title="Owned By" content="Videz" />
          </div>
          <div className='productMore'>
            <div className='productMoreItem'>
              <Typography.Text className='productMoreItemTitle'>Current Bid</Typography.Text>
              <Typography.Title className='productMoreItemPrice'>1.75</Typography.Title>
            </div>
            <div className='productMoreItem'>
              <Typography.Text className='productMoreItemTitle' style={{textAlign: 'right'}}>End In</Typography.Text>
              <Typography.Text className='productMoreItemTime'>Oct 17, 2022 at 05:08</Typography.Text>
            </div>
          </div>
          <Button block type="primary" size="large" className="productButton" icon={<Chart size="medium" />}>
            &nbsp;&nbsp;Place Bid
          </Button>
        </div>
      </div>
      <div className="relatedProductWrapper">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  )
}

export default MarketDetail;