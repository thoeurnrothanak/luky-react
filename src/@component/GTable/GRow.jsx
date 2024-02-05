import React, { useCallback } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Box, Typography } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import GADropdownMenu from './GADropdownMenu';
import AssignTo from './AssignTo';
import NeedMoreInfo from './NeedMoreInfo';
import moment from 'moment';
import ChangePriority from './ChangePriority';
import {
  useApproveAppMutation,
  useLockIndividualMutation,
  useRejectAppMutation,
  useRevokeAppMutation,
  useStartReviewingAppMutation,
  useSubmitAppMutation,
} from 'redux/api/Application';
import { useDispatch } from 'react-redux';
import { fetchError, fetchStart, fetchSuccess } from 'redux/actions';
import { getAllIndividualInApp } from '../../routes/CreateApp/data';

const GRow = ({ row, index, actions = [], onSubmit }) => {
  const dispatch = useDispatch();

  const [revokeApp] = useRevokeAppMutation();
  const [startReviewing] = useStartReviewingAppMutation();
  const [submit] = useSubmitAppMutation();
  const [rejectApp] = useRejectAppMutation();
  const [approveApp] = useApproveAppMutation();
  const [lockIndividual] = useLockIndividualMutation();

  const newActions = useCallback(() => {
    let newActions = [];

    row?.stage?.actions.forEach(({ id, label }) => {
      let action;
      switch (id) {
        case 'revoke':
          action = {
            label,
            onClick: async (app, event) => {
              dispatch(fetchStart());
              try {
                await revokeApp({ appId: app.id }).unwrap();
                dispatch(fetchSuccess('Revoke Application Successfully'));
                if (onSubmit && typeof onSubmit === 'function') {
                  onSubmit(app);
                }
              } catch (error) {
                dispatch(fetchError('Fail to Revoke'));
              }
            },
          };
          break;
        case 'startReviewing':
          action = {
            label,
            onClick: async (app, event) => {
              dispatch(fetchStart());
              try {
                let data = await startReviewing({ appId: app.id }).unwrap();
                dispatch(fetchSuccess());
                if (onSubmit && typeof onSubmit === 'function') {
                  onSubmit(app);
                }
              } catch (error) {
                dispatch(fetchError('Fail to Start Reviewing'));
              }
            },
          };
          break;
        case 'submit':
          action = {
            label,
            onClick: async (app, event) => {
              dispatch(fetchStart());
              try {
                let tmp = await submit({ appId: app.id })
                  .unwrap()
                  .catch((error) => {
                    console.error('EROR:: submit', error);
                    // dispatch(fetchError(error.data.msg));
                    return error;
                  });
                if (tmp && tmp.status === 400) {
                  dispatch(fetchError(tmp.data.msg || tmp.data.message));
                } else {
                  dispatch(fetchSuccess('Application Submitted Successfully'));
                  if (onSubmit && typeof onSubmit === 'function') {
                    onSubmit(app);
                  }
                }
              } catch (error) {
                dispatch(fetchError('Fail to Submit Application'));
              }
            },
          };
          break;
        case 'approve':
          action = {
            label,
            onClick: async (app, event) => {
              dispatch(fetchStart());
              try {
                await approveApp({ appId: app.id }).unwrap();

                dispatch(fetchSuccess('Application Approved Successfully'));
                if (onSubmit && typeof onSubmit === 'function') {
                  onSubmit(app);
                }
              } catch (error) {
                dispatch(fetchError('Fail to Approve Application'));
              }
            },
          };
          break;
        case 'reject':
          action = {
            label,
            onClick: async (app, event) => {
              dispatch(fetchStart());
              try {
                await rejectApp({ appId: app.id }).unwrap();
                dispatch(fetchSuccess('Application Rejected Successfully'));
                if (onSubmit && typeof onSubmit === 'function') {
                  onSubmit(app);
                }
              } catch (error) {
                dispatch(fetchError('Fail to Reject Application'));
              }
            },
          };
          break;
        case 'assignTo':
          action = {
            render: (app) => {
              return <AssignTo appId={app.id} />;
            },
          };
          break;
        case 'needMoreInfo':
          action = {
            render: (app) => {
              return (
                <NeedMoreInfo
                  appId={app._id}
                  onSubmit={(application) => {
                    if (onSubmit && typeof onSubmit === 'function') {
                      onSubmit(application);
                    }
                  }}
                />
              );
            },
          };
          break;

        // case 'changePriority':
        //   action = {
        //     render: (app) => {
        //       return (
        //         <ChangePriority
        //           app={app}
        //           onSubmit={(application) => {
        //             if (onSubmit && typeof onSubmit === 'function') {
        //               onSubmit(application);
        //             }
        //           }}
        //         />
        //       );
        //     },
        //   };
        //   break;
        // case 'edit':
        //   action = {
        //     label,
        //     onClick: (application, event) => {
        //       API.appProvideMoreInfo({ appId: application.id }).then((response) => {
        //         if (response.status === 201) {
        //           if (onSubmit && typeof onSubmit === 'function') {
        //             onSubmit(application);
        //           }
        //         }
        //       });
        //     },
        //   };
        //   break;
        default:
          break;
      }

      if (!!action) {
        newActions.push(action);
      }
    });

    if (row?.stage?.status === 'UNASSIGN') {
      newActions.push({
        render: (app) => {
          return (
            <ChangePriority
              app={app}
              onSubmit={(application) => {
                if (onSubmit && typeof onSubmit === 'function') {
                  onSubmit(application);
                }
              }}
            />
          );
        },
      });
    }

    newActions.push(...actions);

    return newActions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row, actions, onSubmit]);

  const buildCifNo = (row) => {
    let result = '';
    if (row.application && row.application.steps) {
      if (row.application.typeOfBorrower === 'INDIVIDUAL') {
        let borrower = row.application.steps.find((s) => s?.type === 'BORROWER');
        result = borrower.selectedBorrowers?.find((b) => ['10'].includes(b?.borrowerRelationship))?.indNo;
      } else {
        let business = row.application.steps.find((s) => s?.name === 'BUSINESS');
        result = business?.selectedBusiness?.corpNo;
      }
    }
    return result;
  };

  return (
    <TableRow>
      <TableCell width={20}>
        <Typography component="div">
          <Box fontWeight="fontWeightBold">{index + 1}</Box>
        </Typography>
      </TableCell>
      <TableCell align="center">{buildCifNo(row)}</TableCell>
      <TableCell align="center">{row.application?.appNo}</TableCell>
      <TableCell align="center">{row.application?.acronym}</TableCell>
      <TableCell align="center">ACTIVE</TableCell>
      <TableCell align="center">{row.createdAt && moment(row.createdAt).format('Do MMMM YYYY')}</TableCell>
      <TableCell align="center">
        {row.application?.expiryDate && moment(row.application?.expiryDate).format('Do MMMM YYYY - h:mmA ([GMT]Z)')}
      </TableCell>
      <TableCell
        align="center"
        onClick={(event) => {
          event.stopPropagation();
        }}>
        <GADropdownMenu items={newActions(row)} TriggerComponent={<MoreHoriz />} app={row} />
      </TableCell>
    </TableRow>
  );
};

export default GRow;
