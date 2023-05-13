import {Typography} from "ui/components/Core"
import useStyles from './InfoItem.style'
import Image from "next/image";

interface InfoItemProps {
    image: string;
    width?: number;
    height?: number;
    title: string;
    content: string;
}

const InfoItem = ({image, width = 58, height = 58, title, content}: InfoItemProps) => {
    const {styles} = useStyles();

    return (
        <div className={styles.wrapper}>
            <Image src={image} alt={image} width={width} height={height} />
            <div className="info">
                <Typography.Paragraph className="action">{title}</Typography.Paragraph>
                <Typography.Paragraph className="title">{content}</Typography.Paragraph>
            </div>
        </div>
    )
}

export default InfoItem