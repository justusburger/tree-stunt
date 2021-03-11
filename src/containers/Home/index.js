import React, { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getActors } from "../../api/getActors";
import ActorCard from "../../components/ActorCard";
import SwipeableViews from "react-swipeable-views";
import {
  Spacer,
  ActiveCard,
  StackOfActorCardsRegion,
  Container,
  ActiveCardRegion,
} from "./style";
import StackOfActorCards from "../../components/StackOfActorCards";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import LinearProgress from "@material-ui/core/LinearProgress";

function Home() {
  /* Load the actors from API and store in actors. Notice that we use
   * react-query to keep track of the API states.
   *
   * https://react-query.tanstack.com/overview
   *  */
  const { data: actors, isLoading } = useQuery("actors", getActors);

  /* We keep track of the liked and disliked actors using 2 dictionaries in state. */
  const [likedActors, setLikedActors] = useState({});
  const [dislikedActors, setDislikedActors] = useState({});

  /* This section filters the actors array (from the API) by first removing
   * any actors that's already in the likedActors or dislikedActors dictionaries.
   * We then split the array into 2 field, activeActor and remainingActors. */
  const [activeActor, remainingActors] = useMemo(() => {
    /* If the actors array is not defined yet, simple return nulls. */
    if (!actors) return [null, null];
    const filteredActors = actors.filter(({ id }) => {
      return !(id in likedActors || id in dislikedActors);
    });
    return [filteredActors[0], filteredActors.slice(1)];
  }, [actors, dislikedActors, likedActors]);

  /* When disliking an actor, add them to the dislikedActors dictionary.
   * Using a dictionary instead of an array for fast lookup. */
  const handleDislike = useCallback(() => {
    setDislikedActors({
      ...dislikedActors,
      [activeActor.id]: activeActor,
    });
  }, [setDislikedActors, dislikedActors, activeActor]);

  /* When liking an actor, add them to the likedActors dictionary.
   * Using a dictionary instead of an array for fast lookup. */
  const handleLike = useCallback(() => {
    setLikedActors({
      ...likedActors,
      [activeActor.id]: activeActor,
    });
  }, [likedActors, activeActor]);

  /* The SwipeableViews component fires the onChangeIndex callback when a swipe occurs.
   * Since we set the SwipeableViews component index to 1 explicitly, the onChangeIndex
   * callback will only ever be called with a newIndex of 0 (swipe right) or 2 (swipe left).
   * We then call the handleLike or handleDislike functions based on the nextIndex.
   *
   * Notice that this will set off a chain reaction of state updates that will result in the
   * activeActor variable changing. We then force the SwipeableViews component to rerender
   * by updating the key property to the next activeActor's id. This is to reset the currentIndex
   * back to 1. This is a bit of a hack, but it's the only way to change the index programmatically.
   *
   * https://react-swipeable-views.com/getting-started/usage/
   *  */
  const handleChangeIndex = useCallback(
    (newIndex) => {
      setTimeout(() => {
        if (newIndex === 0) {
          handleDislike();
        } else if (newIndex === 2) {
          handleLike();
        }
      }, 150);
    },
    [handleDislike, handleLike]
  );

  /* We render 2 main sections: ActiveCardRegion and StackOfActorCardsRegion and then
   * style them to stack, ActiveCardRegion being in front.
   *
   * The ActiveCardRegion region contains a SwipeableViews component with 3 slides as
   * children. The first slide is the Spacer component with a Like icon. The second slide
   * is the activeActor rendered into an ActorCard. The third slide is another Spacer
   * but it contains the Dislike icon. Notice that the active/selected slide is set explicitly
   * to be the middle slide, containing the ActorCard. The user can then slide left or right
   * only once, as a way to set the active actor to liked/disliked.
   *
   * The StackOfActorCardsRegion region contains a stack of ActorCard rendered on top
   * of each other, and styled to look like an actual stack of cards. This is just visual
   * and appears behind the ActiveCardRegion from above.
   *  */
  return (
    <Container maxWidth="xs">
      {isLoading ? (
        <>
          {/* Show a linear loading indicator when the API response is being loaded */}
          <LinearProgress />
        </>
      ) : (
        <>
          {activeActor && (
            <ActiveCardRegion>
              <SwipeableViews
                /* Setting the key to the ID of the activeActor forces the SwipeableViews
                 * component to rerender and reset the index to 1 when the activeActor
                 * changes. */
                key={activeActor.id}
                resistance
                index={1}
                onChangeIndex={handleChangeIndex}
                enableMouseEvents
                /* This enables us to see the slides that's NOT currently active (on the sides).
                 * This improves the experience on desktop specifically. */
                style={{ overflow: "visible" }}
              >
                <Spacer left>
                  <FavoriteBorder
                    /* Notice that the user can click the dislike button on desktop */
                    onClick={handleDislike}
                  />
                </Spacer>
                <ActiveCard>
                  <ActorCard actor={activeActor} />
                </ActiveCard>
                <Spacer right>
                  <SentimentDissatisfiedIcon
                    /* Notice that the user can click the like button on desktop */
                    onClick={handleLike}
                  />
                </Spacer>
              </SwipeableViews>
            </ActiveCardRegion>
          )}
          <StackOfActorCardsRegion>
            <StackOfActorCards
              /* We pass in the remaining actors as calculated earlier to be rendered into
               * a stack of cards */
              actors={remainingActors}
            />
          </StackOfActorCardsRegion>
        </>
      )}
    </Container>
  );
}

export default React.memo(Home);
