import React from "react";
import { Container, Item, Empty } from "./style";
import ActorCard from "../ActorCard";
import * as PropTypes from "prop-types";

/* This component renders a stack of ActorCards and
 * places them on top of each other. It uses the index
 * to calculate styles for each container, as to position
 * and scale it smaller as we progress to the rear of the array. */
function StackOfActorCards({ actors }) {
  return (
    <Container>
      {actors && actors.length > 0 ? (
        actors.map((actor, i) => (
          <Item key={actor.id} style={CalculateItemStyle(i)}>
            <ActorCard actor={actor} />
          </Item>
        ))
      ) : (
        <Empty>No more actors!</Empty>
      )}
    </Container>
  );
}

/* This function calculates some styles based on the index parameter */
function CalculateItemStyle(index) {
  /* Here we hide the cards after index 4 */
  if (index > 5) return { display: "none" };

  /* We calculate some scalingFactor using the index. This scalingFactor
   * shrinks as index increases. */
  const scalingFactor = ((1 / (index + 2)) * (1 / (index + 3))) / 0.3;
  return {
    top: `${100 * scalingFactor - 40}px`,

    /* We invert the the zIndex as to put the first items in the array on top */
    zIndex: 100 - index,

    /* This shrinks the cards as the index increases */
    transform: `scale(${0.8 + 0.2 * scalingFactor})`,
  };
}

StackOfActorCards.propTypes = {
  actors: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default React.memo(StackOfActorCards);
