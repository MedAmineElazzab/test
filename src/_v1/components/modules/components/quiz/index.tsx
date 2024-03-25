import Button from "@/_v1/components/Buttons/Button";
import { Progress } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { QuizOption } from "./components";
interface QuizPageProps {
  closeAction: () => void;
}
export default function QuizIndex({ closeAction }: QuizPageProps) {

  const data = [
    {
      name: "La basicité augmente avec la diminution.",
      optionId: 1,
      checked: false,
    },
    {
      name: "Le couple acide base de l’acide chlorhydrique.",
      optionId: 2,
      checked: false,
    },
    {
      name: "Le produit ionique de l’eau.",
      optionId: 2,
      checked: false,
    },
    {
      name: "La réaction d’autoprotolyse de l’eau ",
      optionId: 2,
      checked: false,
    },
    {
      name: "La réaction d’autoprotolyse de l’eau ",
      optionId: 2,
      checked: false,
    },
  ];

  const GetQuiz = async () =>{
      // const {} = await 
  }
  return (
    <div className="relative flex w-full h-full">
      <div className="left-section bg-primary-normal w-[400px] h-full py-[30px]  shadow flex flex-col justify-between items-center">
        <div></div>
        <div>
          <div className="text-white flex px-5 text-center flex-col justify-center items-center gap-[20px]">
            <div className="logo-section  w-[250px] w1300:w-[170px]  px-[10px] mb-3   flex justify-center items-center ">
              <img src="/quiz.svg" alt="" />
            </div>
            <h2 className="text-[26px] font-[700]">
              QUIZ : How does the Stomach Function?
            </h2>
            <p className="text-center">
              Les informations du demandeur sont les informations personnelles
              qui permettent de l&apos;identifier et de le contacter.
            </p>
            <Button
              onClick={() => {
                closeAction();
              }}
              className="bg-secondry-normal text-[17px] hover:bg-secondry-normal/80 text-[#333]"
            >
              Revenir à l&apos;accueil
            </Button>
          </div>
        </div>
        <div className="completed w-full px-[50px] flex flex-col gap-4 justify-center items-center ">
          <span className="text-white font-[700] text-[23px]">0% Complete</span>
          <Progress
            styles={{
              root: {
                height: "10px",
                borderRadius: "10px",
              },
              bar: {
                background: "#0049e090",
                borderRadius: "0px !important",
              },
            }}
            className="w-full"
            value={0}
          />
        </div>
      </div>
      <div className="right-section w-[calc(100%)] h-full flex-1 flex justify-center overflow-y-auto ">
        <div className="flex flex-col gap-[30px] max-w-[900px] m-auto">
          <div className="flex gap-2 flex-col">
            <div className="text-primary-normal font-[500] text-[18px]">
              Question 1 out of 10
            </div>
            <div className="question-title text-[27px] font-[500]">
              Qu&apos;est-ce qui n&apos;est pas une pratique de maintenance des appareils
              médicales ?
            </div>
          </div>
          <div className="options flex flex-col gap-4">
            {data.map((el, index) => {
              return <QuizOption key={index} {...el} />;
            })}
          </div>
          <div>
            <Button className="text-[18px] bg-primary-normal !h-[60px] w-full">
              Next question
              <IconArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
