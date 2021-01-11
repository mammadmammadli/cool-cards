import { useRef } from "react";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Container = styled.div`
  height: 80vh;
  width: 80%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  perspective: 800px;
`;

const Card = styled.div`
  width: 350px;
  height: 80%;
  border-radius: 20px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
  transform-style: preserve-3d;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;

  img {
    transition: all 0.5s ease;
    height: 200px;
    width: 380px;
    object-fit: cover;
  }
`;

const Info = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  h1 {
    text-align: center;
  }

  p {
    color: gray;
  }
`;

const Button = styled.button`
  border: 0;
  height: 32px;
  cursor: pointer;
  padding: 20px 20px;
  border-radius: 5px;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfigureButton = styled(Button)`
  margin-top: auto;
  background-color: white;
  border: 1px solid #1c6bba;
  color: #1c6bba;
  transition: color 200ms ease-in, background-color 200ms ease-in;

  &:hover {
    background-color: #1c6bba;
    color: white;
  }
`;

const mockCars = [
  {
    img: "/assets/images/volvo.png",
    title: "XC90",
    description:
      "The evolution of the luxury SUV. Refined strength, with a uniquely Scandinavian sense of craftsmanship and ingenuity.",
  },
  {
    img: "/assets/images/v60.png",
    title: "V60",
    description:
      "Elegant, sporty, versatile: welcome to the new generation of Volvo estate car – created to make every moment count.",
  },
  {
    img: "/assets/images/xc60.png",
    title: "XC60",
    description:
      "Dynamic, refined and intuitive – the Swedish SUV has evolved.",
  },
];

function App() {
  const imagesRef = useRef([]);
  const cardsRef = useRef([]);

  const handleMouseMove = ({ pageX, pageY }, i) => {
    const x = (window.innerWidth / 2 - pageX) / 25;
    const y = (window.innerHeight / 2 - pageY) / 25;

    // cardsRef.current[i].style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    cardsRef.current[i].style.transform = `translateZ(80px)`;
    cardsRef.current[i].style.boxShadow = `0 20px 50px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 0, 0.2)`;
    imagesRef.current[i].style.transform = `translateZ(50px)`;
  };

  const handleMouseLeave = (_, i) => {
    cardsRef.current[i].style.transform = `rotateY(0deg) rotateX(0deg)`;
    cardsRef.current[i].style.transition = `all 0.5s ease`;
    imagesRef.current[i].style.transform = `translateZ(0)`;
    cardsRef.current[i].style.boxShadow = `0 10px 20px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.2)`;
    imagesRef.current[i].style.transition = `all 0.5s ease`;
  };

  return (
    <Layout>
      <Container>
        {mockCars.map(({ description, img, title }, i) => {
          return (
            <Card
              ref={(el) => {
                if (el && !cardsRef.current.includes(el)) {
                  cardsRef.current.push(el);
                }
              }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={(e) => handleMouseLeave(e, i)}
            >
              <ImageContainer>
                <img
                  ref={(el) => {
                    if (el && !imagesRef.current.includes(el)) {
                      imagesRef.current.push(el);
                    }
                  }}
                  alt="car"
                  src={img}
                />
              </ImageContainer>
              <Info>
                <h1>{title}</h1>
                <p>{description}</p>
                <ConfigureButton>Configure now</ConfigureButton>
              </Info>
            </Card>
          );
        })}
      </Container>
    </Layout>
  );
}

export default App;
