# Integration with JupiterOne

## Setup

The integration authenticates using an API Token.

1.  In your Management Console, click **Settings** > **USERS**
2.  Click your username
3.  Click the edit button
4.  **Edit User** > **API Token** -> **Generate**. If you see Revoke and
    Regenerate, you already have a token. If you revoke or regenerate it,
    scripts that use that token will not work. There is no confirmation. Revoke
    removes the token authorization. Regenerate revokes the token and generates
    a new token. If you click Generate or Regenerate, a message shows the token
    string and the date that the token expires.
5.  Click **DOWNLOAD**.

## Data Model

<!-- {J1_DOCUMENTATION_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE
"j1-integration document" COMMAND. DO NOT EDIT BY HAND! PLEASE SEE THE DEVELOPER
DOCUMENTATION FOR USAGE INFORMATION:

https://github.com/JupiterOne/sdk/blob/master/docs/integrations/development.md
********************************************************************************
-->

## Data Model

### Entities

The following entities are created:

| Resources | Entity `_type`        | Entity `_class` |
| --------- | --------------------- | --------------- |
| Account   | `sentinelone_account` | `Account`       |
| Agent     | `sentinelone_agent`   | `HostAgent`     |
| Group     | `sentinelone_group`   | `Group`         |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `sentinelone_account` | **HAS**               | `sentinelone_group`   |
| `sentinelone_group`   | **HAS**               | `sentinelone_agent`   |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
