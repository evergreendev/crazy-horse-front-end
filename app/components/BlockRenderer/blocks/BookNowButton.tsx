import React from 'react';
import Button from "@/app/components/Button";
import {buttonConfig} from "@/app/components/ButtonConfig";
import {faChevronCircleRight} from "@awesome.me/kit-2a2dc088e2/icons/classic/thin";


const BookNowButton: React.FC = () => {
    return (
        <div className="flex w-72 mx-auto my-4">
            <Button config={buttonConfig.primary + " mb-5 w-full"} text="Book Tickets"
                    href="https://fareharbor.com/embeds/book/crazyhorsememorial/items/354688/?full-items=yes&flow=680245&u=47a370f1-2caf-4219-b33e-3daf581fa1e0&from-ssl=yes&ga=UA-7000283-1%2C1694069336.1703794957%3BUA-156164615-1%2C1694069336.1703794957%3B&ga4t=AW-16566712924%2Cundefined__undefined%3BG-YDSBS7V3D3%2C1694069336.1703794957__1729092627%3B&g4=yes&cp=no&csp=no&back=https%3A%2F%2Fcrazyhorsememorial.org%2Fvisit&language=en-us"
                    icon={faChevronCircleRight}/>
        </div>
    );
};

export default BookNowButton;
