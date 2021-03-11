import React from "react";
import { Avatar, Card, Name, ContentRegion, AgeLabel, Bio } from "./style";
import PropTypes from "prop-types";
import Skeleton from "@material-ui/lab/Skeleton";

/* This component renders the actor card. Nothing special, just cosmetic. */
function ActorCard({ actor, ...props }) {
  const { first_name, last_name, avatar, age } = actor;
  return (
    <Card elevation={0} {...props}>
      <Avatar style={{ backgroundImage: `url(${avatar})` }} />
      <ContentRegion>
        <Name>
          {first_name} {last_name}
          <AgeLabel>, {age}</AgeLabel>
        </Name>
        <Bio>
          <Skeleton animation={false} />
          <Skeleton animation={false} width="45%" />
        </Bio>
      </ContentRegion>
    </Card>
  );
}

ActorCard.propTypes = {
  actor: PropTypes.any.isRequired,
};

export default React.memo(ActorCard);
