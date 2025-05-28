'use client';

import { iProperty } from "@/utiles/type";
import { 
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    EmailShareButton,
    WhatsappShareButton,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    EmailIcon,
    WhatsappIcon

 } from "react-share";

const ShareButton = ({ details }: { details: iProperty }) => {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/property/${details._id}`
    return (    
        <div>
            <h3 className="text-lg font-bold text-center my-4 text-blue-500">Share Property</h3>
            <div className="flex items-center justify-center gap-4">
                
                <FacebookShareButton url={shareUrl} title={details.name} >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <LinkedinShareButton url={shareUrl}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <TwitterShareButton url={shareUrl}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <EmailShareButton url={shareUrl}>
                    <EmailIcon size={32} round />
                </EmailShareButton>
                <WhatsappShareButton url={shareUrl}>
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
            </div>
        </div>
     );
}
 
export default ShareButton;