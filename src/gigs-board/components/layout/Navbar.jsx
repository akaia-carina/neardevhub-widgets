/* INCLUDE: "common.jsx" */
const nearDevGovGigsContractAccountId =
  props.nearDevGovGigsContractAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];

const nearDevGovGigsWidgetsAccountId =
  props.nearDevGovGigsWidgetsAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];

/**
 * Reads a board config from DevHub contract storage.
 * Currently a mock.
 *
 * Boards are indexed by their ids.
 */
const boardConfigByBoardId = ({ boardId }) => {
  return {
    probablyUUIDv4: {
      id: "probablyUUIDv4",

      columns: [
        { title: "Draft", labelFilters: ["S-draft"] },
        { title: "Review", labelFilters: ["S-review"] },
      ],

      dataTypes: { Issue: true, PullRequest: true },
      description: "Latest NEAR Enhancement Proposals by status",
      repoURL: "https://github.com/near/NEPs",
      title: "NEAR Protocol NEPs",
    },
  }[boardId];
};

function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    nearDevGovGigsContractAccountId: props.nearDevGovGigsContractAccountId,
    nearDevGovGigsWidgetsAccountId: props.nearDevGovGigsWidgetsAccountId,
    referral: props.referral,
  };

  return (
    <Widget
      src={`${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.${widgetName}`}
      props={widgetProps}
      key={key}
    />
  );
}

function href(widgetName, linkProps) {
  linkProps = { ...linkProps };

  if (props.nearDevGovGigsContractAccountId) {
    linkProps.nearDevGovGigsContractAccountId =
      props.nearDevGovGigsContractAccountId;
  }

  if (props.nearDevGovGigsWidgetsAccountId) {
    linkProps.nearDevGovGigsWidgetsAccountId =
      props.nearDevGovGigsWidgetsAccountId;
  }

  if (props.referral) {
    linkProps.referral = props.referral;
  }

  const linkPropsQuery = Object.entries(linkProps)
    .filter(([_key, nullable]) => (nullable ?? null) !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return `/#/${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.pages.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}

const CompactContainer = styled.div`
  width: fit-content !important;
  max-width: 100%;
`;

const FormCheckLabel = styled.label`
  white-space: nowrap;
`;
/* END_INCLUDE: "common.jsx" */

return (
  <div class="card border-secondary mb-2">
    <div class="nav navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item ">
            <a class="nav-link active" href={href("Feed")}>
              <i class="bi-house-fill"> </i>
              Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href={href("Feed", { recency: "all" })}>
              <i class="bi-envelope-fill"> </i>
              Recent
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link active"
              href={href("Feed", { label: "recurrent" })}
            >
              <i class="bi-repeat"> </i>
              Recurrent
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href={href("Feed", { recency: "hot" })}>
              <i class="bi-fire"> </i>
              Hottest
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href={href("Boards")}>
              <i class="bi-kanban"> </i>
              Boards
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link active"
              href={href("Teams")}
              title="View teams and permissions"
            >
              <i class="bi-people-fill"> </i>
              Teams
            </a>
          </li>

          {props.children
            ? props.children.map((child) => (
                <li class="nav-item active ms-2">{child}</li>
              ))
            : null}
        </ul>
      </div>
    </div>
  </div>
);
