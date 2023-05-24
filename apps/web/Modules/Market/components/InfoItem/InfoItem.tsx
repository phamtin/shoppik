import { Button, Typography } from 'ui/components/Core';
import useStyles from './InfoItem.style';
import Image from 'next/image';

interface InfoItemProps {
    image: string;
    width?: number;
    height?: number;
    title: string;
    content: string;
    mBottom?: number;
    showButton?: boolean;
    renderRight?: boolean;
}

const InfoItem = ({
    image,
    width = 50,
    height = 50,
    title,
    content,
    mBottom = 0,
    showButton = false,
    renderRight = false,
}: InfoItemProps) => {
    const { styles } = useStyles();

    const renderRightChild = () => {
        if (renderRight)
            return (
                <div className="rightSection">
                    <Typography.Paragraph>8,456</Typography.Paragraph>
                    <Typography.Paragraph>+23,00%</Typography.Paragraph>
                </div>
            );

        if (showButton) return <Button>Follow</Button>;

        return <></>;
    };

    return (
        <div className={styles.wrapper} style={{ marginBottom: mBottom }}>
            <div className="infoSection">
                <Image src={image} alt={image} width={width} height={height} />
                <div className="info">
                    <Typography.Paragraph className="action">{title}</Typography.Paragraph>
                    <Typography.Paragraph className="title">{content}</Typography.Paragraph>
                </div>
            </div>
            {renderRightChild()}
        </div>
    );
};

export default InfoItem;
