import {Button, Col, Row, Typography} from "ui/components/Core"
import useStyles from './DashboardOverview.style'
import Image from "next/image";
import ProductCard from "@/Modules/Market/components/ProductCard/ProductCard";
import {Chart} from "react-iconly";
import InfoItem from "@/Modules/Market/components/InfoItem/InfoItem";

const DashboardOverview = () => {
    const {styles} = useStyles();

    return (
        <div className={styles.wrapper}>
            <div className="leftWrapper">
                <div className="bannerWrapper">
                    <div>
                        <Typography.Title className="title">Create and Sell NFTs</Typography.Title>
                        <Typography.Paragraph className="desc">World's Largest NFT Place</Typography.Paragraph>
                    </div>
                    <Row gutter={20}>
                        <Col>
                            <Button className="button">
                                Explore More
                            </Button>
                        </Col>
                        <Col>
                            <Button className="button">
                                Sell Artwork
                            </Button>
                        </Col>
                    </Row>
                </div>

                <div className="trendingWrapper">
                    <div className="trendingTitleSection">
                        <Typography.Title className="tredingText">Treding</Typography.Title>
                        <Typography.Paragraph className="viewAll">View All</Typography.Paragraph>
                    </div>
                    <div className="trendingCards">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </div>

                <div className="topCollectionWrapper">
                    <div className="topCollectionTitleSection">
                        <Typography.Title className="collectionText">Top Collection</Typography.Title>
                        <Typography.Paragraph className="viewAll">View All</Typography.Paragraph>
                    </div>
                </div>
            </div>

            <div className="rightWrapper">
                <div className="bestSellerWrapper">
                    <div className="sellerTitleArea">
                        <Typography.Title className="sellerText">Dashboard Overview</Typography.Title>
                        <Chart />
                    </div>
                    <div className="bestSellerItems">
                        <InfoItem image="/images/ava1.png" title="Created By" content="Perperzon" mBottom={18} showButton />
                        <InfoItem image="/images/ava1.png" title="Created By" content="Perperzon" mBottom={18} showButton />
                        <InfoItem image="/images/ava1.png" title="Created By" content="Perperzon" mBottom={18} showButton />
                        <InfoItem image="/images/ava1.png" title="Created By" content="Perperzon" mBottom={18} showButton />
                        <InfoItem image="/images/ava1.png" title="Created By" content="Perperzon" mBottom={18} showButton />
                        <InfoItem image="/images/ava1.png" title="Created By" content="Perperzon" showButton />
                    </div>
                </div>

                <div className="recentViewWrapper">
                    <div className="recentViewArea">
                        <Typography.Title className="recentViewText">Recent Viewed</Typography.Title>
                        <Chart />
                    </div>
                    <div className="bestSellerItems">
                        <InfoItem image="/images/ava1.png" title="Created By" content="Perperzon" mBottom={18} renderRight />
                        <InfoItem image="/images/ava1.png" title="Created By" content="Perperzon" renderRight />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DashboardOverview